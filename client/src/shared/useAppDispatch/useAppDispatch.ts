import { AppDispatch } from '@lib/redux/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;