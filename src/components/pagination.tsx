import { SearchData } from '@/types/todo';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';

interface PaginationProps {
  searchData: SearchData;
  pageDataCount: number;
}

export default function Pagination({ searchData, pageDataCount }: PaginationProps) {
  const { page, status, limit } = searchData;

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 w-full">
      <div className="flex">
        <Link
          href={{
            pathname: '/',
            query: {
              ...(status ? { status } : {}),
              page: page === 2 ? undefined : page - 1
            }
          }}
          className={classNames("inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700", {
            'pointer-events-none opacity-50': page <= 1
          })}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="flex">
        <Link
          href={{
            pathname: '/',
            query: {
              ...(status ? { status } : {}),
              page: page + 1
            }
          }}
          className={classNames("inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700", {
            'pointer-events-none opacity-50': pageDataCount < limit
          })}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
