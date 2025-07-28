import React from 'react';

const SkeletonRatesTable = () => {
  // Generate skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header with Sort Controls */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed" role="table" aria-label="Loading mortgage rates">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/5 px-3 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </th>
                <th className="w-1/8 px-2 py-3 text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </th>
                <th className="w-1/8 px-2 py-3 text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-8 mx-auto"></div>
                </th>
                <th className="w-1/8 px-2 py-3 text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </th>
                <th className="w-1/8 px-2 py-3 text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-10 mx-auto"></div>
                </th>
                <th className="w-1/4 px-3 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </th>
                <th className="w-1/6 px-3 py-3 text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {skeletonRows.map((index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Lender */}
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="px-2 py-3 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-8"></div>
                      </div>
                    </div>
                  </td>

                  {/* APR */}
                  <td className="px-2 py-3 text-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-10 mx-auto"></div>
                  </td>

                  {/* Term */}
                  <td className="px-2 py-3 text-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                  </td>

                  {/* Type */}
                  <td className="px-2 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded-full animate-pulse w-12 mx-auto"></div>
                  </td>

                  {/* Features */}
                  <td className="px-3 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse mr-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse mr-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex flex-col space-y-1">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-16 mx-auto"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View Skeleton */}
      <div className="lg:hidden">
        <div className="space-y-4 p-4">
          {skeletonRows.map((index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              {/* Lender Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-12 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-8"></div>
                </div>
              </div>

              {/* Rate Details */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-8 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-8 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-8 mb-1"></div>
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-12"></div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-12 mb-2"></div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded animate-pulse mr-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded animate-pulse mr-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="mt-2 sm:mt-0">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRatesTable; 