import { useState } from 'react';
import userData from './users';

export default function DataTable() {
  const [perPage, setPerPage] = useState(5);
  const {
    currentPage,
    handleNextPageClick,
    handlePrevPageClick,
    nextEnabled,
    prevEnabled,
    setCurrentPage,
    totalPages,
    users,
  } = usePagination(userData, perPage);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(e.currentTarget.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {[
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Age', key: 'age' },
              { label: 'Occupation', key: 'occupation' },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, age, occupation }) => (
            <tr className='border border-l-0 border-r-0' key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='space-x-5 py-5'>
        <select className='border' name='' id='' onChange={handleSelectChange}>
          <option value='5'>Show 5</option>
          <option value='10'>Show 10</option>
          <option value='20'>Show 20</option>
        </select>
        <button
          className={`border ${prevEnabled ? '' : 'opacity-30'}`}
          disabled={!prevEnabled}
          onClick={handlePrevPageClick}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={!nextEnabled}
          className={`border ${nextEnabled ? '' : 'opacity-30'}`}
          onClick={handleNextPageClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface User {
  id: number;
  name: string;
  age: number;
  occupation: string;
}

interface UsePaginationResult {
  currentPage: number;
  handleNextPageClick: () => void;
  handlePrevPageClick: () => void;
  nextEnabled: boolean;
  prevEnabled: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  users: User[];
}

function usePagination(userData: User[], perPage: number): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const start = perPage * (currentPage - 1);
  const end = perPage * currentPage;
  const users = userData.slice(start, end);
  const totalPages = Math.ceil(userData.length / perPage);
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  function handleNextPageClick(): void {
    setCurrentPage((prev) => {
      // in case we want to set a page number higher than total pages
      return Math.min(prev + 1, totalPages);
    });
  }

  function handlePrevPageClick(): void {
    setCurrentPage((prev) => {
      // in case we want to set a page number number lower than 1
      return Math.max(prev - 1, 1);
    });
  }

  return {
    currentPage,
    handleNextPageClick,
    handlePrevPageClick,
    nextEnabled,
    prevEnabled,
    setCurrentPage,
    totalPages,
    users,
  };
}
