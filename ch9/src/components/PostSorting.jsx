import React from 'react'
import PropTypes from 'prop-types'
import { ArrowDown, ArrowUp } from 'lucide-react'

export const PostSorting = ({ value, onChange, orderValue, onOrderChange }) => {
  return (
    <div className='flex flex-wrap items-center justify-end gap-4 mb-6 px-4'>
      <span className='text-indigo-100 font-medium text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm'>
        Sort By:
      </span>

      <div className='flex bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/10'>
        <button
          onClick={() => onChange('createdAt')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${value === 'createdAt' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-200 hover:text-white'}`}
        >
          Date Created
        </button>
        <button
          onClick={() => onChange('updatedAt')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${value === 'updatedAt' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-200 hover:text-white'}`}
        >
          Last Updated
        </button>
      </div>

      <button
        onClick={() => {
          orderValue === 'descending'
            ? onOrderChange('ascending')
            : onOrderChange('descending')
        }}
        className='p-2 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-xl text-indigo-100 border border-white/10 transition-colors'
        title='Toggle Direction'
      >
        {orderValue === 'ascending' ? (
          <ArrowUp size={18} />
        ) : (
          <ArrowDown size={18} />
        )}
      </button>
    </div>
  )
}

//   {
//   return (
//     <div className='flex items-center gap-3'>
//       <label className='text-sm text-gray-600' htmlFor='sortBy'>
//         Sort
//       </label>
//       <select
//         name='sortBy'
//         id='sortBy'
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className='border rounded-md px-2 py-1 bg-white text-sm'
//       >
//         {fields.map((field) => (
//           <option key={field} value={field}>
//             {field}
//           </option>
//         ))}
//       </select>
//       <span className='text-gray-400'>/</span>
//       <label className='sr-only' htmlFor='sortOrder'>
//         Sort Order
//       </label>
//       <select
//         name='sortOrder'
//         id='sortOrder'
//         value={orderValue}
//         onChange={(e) => onOrderChange(e.target.value)}
//         className='border rounded-md px-2 py-1 bg-white text-sm'
//       >
//         <option value='ascending'>ascending</option>
//         <option value='descending'>descending</option>
//       </select>
//     </div>
//   )
// }
PostSorting.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
