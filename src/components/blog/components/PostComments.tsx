import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import client from '@/lib/client';
import { formatDate } from '@/lib/utils';
import { BlogComment } from '@/types/database';

interface PostCommentsProps {
  postId: string;
}

// Definiere FormData mit expliziten String-Typen
interface FormData {
  name: string;
  email: string;
  content: string;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<FormData>({
    name: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await client
          .from('comments') // Table name in our mock DB
          .select('*')
          .eq('post_id', postId)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (response.error) {
          throw response.error;
        }

        // Verwende Type Assertion für die korrekten Typen
        const commentsData = (response.data || []) as BlogComment[];
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Angepasste Input-Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!newComment.name || !newComment.email || !newComment.content) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newComment.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Generate avatar URL from name
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        newComment.name
      )}&background=random&color=fff`;

      // Submit comment to database
      const { error } = await client.from('comments').insert([
        {
          post_id: postId,
          author_name: newComment.name,
          author_email: newComment.email,
          content: newComment.content,
          avatar: avatarUrl,
          is_approved: false, // Comments require approval
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setNewComment({
        name: '',
        email: '',
        content: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Failed to submit comment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="comments-section">
      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Leave a Comment</h3>

        {submitSuccess ? (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md mb-4">
            Your comment has been submitted and is awaiting approval. Thank you!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newComment.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email * (will not be published)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newComment.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Comment *
              </label>
              <textarea
                id="content"
                name="content"
                value={newComment.content}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Your comment"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Post Comment'}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Comments are moderated and will appear after approval.
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm"
              >
                <div className="flex items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0 mr-4">
                    {comment.avatar ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={comment.avatar}
                          alt={comment.author_name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Comment content */}
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {comment.author_name}
                      </h4>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(comment.created_at, 'dd.MM.yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PostComments;
