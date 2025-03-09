'use client';

import { useState, useEffect } from 'react';
import { DayFeedback } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from '@phosphor-icons/react';

export default function FeedbackDashboard() {
    const [feedbackData, setFeedbackData] = useState<DayFeedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFeedbackData() {
            try {
                const response = await fetch('/api/feedback/admin');

                if (!response.ok) {
                    throw new Error(`Error fetching feedback data: ${response.status}`);
                }

                const data = await response.json();
                setFeedbackData(data || []);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
                setError('Failed to load feedback data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchFeedbackData();
    }, []);

    // Calculate total likes and dislikes
    const totalLikes = feedbackData.reduce((sum, item) => sum + (item.likes || 0), 0);
    const totalDislikes = feedbackData.reduce((sum, item) => sum + (item.dislikes || 0), 0);
    const totalInteractions = totalLikes + totalDislikes;
    const likePercentage = totalInteractions > 0 ? Math.round((totalLikes / totalInteractions) * 100) : 0;

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Feedback Dashboard</h1>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Total Feedback</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalInteractions}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Total Likes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <ThumbsUp className="mr-2 text-blue-500" size={20} />
                                    <span className="text-2xl font-bold">{totalLikes}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Total Dislikes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <ThumbsDown className="mr-2 text-red-500" size={20} />
                                    <span className="text-2xl font-bold">{totalDislikes}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">Like Percentage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{likePercentage}%</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Day-by-Day Feedback Table */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Day
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Likes
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dislikes
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ratio
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {feedbackData.map((day) => {
                                    const dayTotal = (day.likes || 0) + (day.dislikes || 0);
                                    const dayRatio = dayTotal > 0 ? Math.round((day.likes / dayTotal) * 100) : 0;

                                    return (
                                        <tr key={day.day_id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Day {day.day_id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <ThumbsUp className="mr-2 text-blue-500" size={16} />
                                                    <div className="text-sm text-gray-900">{day.likes || 0}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <ThumbsDown className="mr-2 text-red-500" size={16} />
                                                    <div className="text-sm text-gray-900">{day.dislikes || 0}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{dayRatio}%</div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                                    <div
                                                        className="bg-blue-500 h-2.5 rounded-full"
                                                        style={{ width: `${dayRatio}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {dayTotal}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
