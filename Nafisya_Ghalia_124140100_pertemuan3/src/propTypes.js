import PropTypes from 'prop-types';
import { BOOK_STATUSES } from './constants';

export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(BOOK_STATUSES).isRequired,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
});