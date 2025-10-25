'use client';

import { Generation } from '@/types';

interface GenerationsListProps {
  generations: Generation[];
  isLoading: boolean;
}

export function GenerationsList({ generations, isLoading }: GenerationsListProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || badges.PENDING;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Recent Generations
        </h2>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Recent Generations
        <span className="text-sm text-gray-500 ml-2">(Last 5)</span>
      </h2>

      {generations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No generations yet</p>
          <p className="text-sm">Upload an image to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {generations.map((gen) => (
            <div
              key={gen.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(gen.status)}`}
                >
                  {gen.status}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(gen.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Original</p>
                  <img
                    src={`${gen.imageUrl}`}
                    alt="Original"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Result</p>
                  {gen.status === 'COMPLETED' && gen.resultImageUrl ? (
                    <img
                      src={`${gen.resultImageUrl}`}
                      alt="Result"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : gen.status === 'FAILED' ? (
                    <div className="w-full h-32 bg-red-50 rounded flex items-center justify-center">
                      <span className="text-red-600 text-sm">❌ Failed</span>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Prompt */}
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Prompt:</span> {gen.prompt}
              </p>

              {/* Error Message */}
              {gen.status === 'FAILED' && gen.errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-2">
                  <p className="text-xs text-red-700">
                    <strong>Error:</strong> {gen.errorMessage}
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    💡 Try again in a moment
                  </p>
                </div>
              )}

              {/* Processing Time */}
              {gen.processingTime && (
                <p className="text-xs text-gray-500 mt-2">
                  ⏱️ Processed in {(gen.processingTime / 1000).toFixed(2)}s
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}