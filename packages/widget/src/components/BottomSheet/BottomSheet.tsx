import { Drawer } from '@mui/material';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { getScrollableContainer } from '../../hooks';
import { backdropProps, modalProps, paperProps } from '../Dialog';
import type { BottomSheetBase, BottomSheetProps } from './types';

export const BottomSheet = forwardRef<BottomSheetBase, BottomSheetProps>(
  ({ elementRef, children, open }, ref) => {
    const openRef = useRef(open);
    const [drawerOpen, setDrawerOpen] = useState(open);

    const close = useCallback(() => {
      setDrawerOpen(false);
      openRef.current = false;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        isOpen: () => openRef.current,
        open: () => {
          setDrawerOpen(true);
          openRef.current = true;
        },
        close,
      }),
      [close],
    );

    return (
      <Drawer
        container={getScrollableContainer}
        ref={elementRef}
        anchor="bottom"
        open={drawerOpen}
        onClose={close}
        ModalProps={modalProps}
        PaperProps={paperProps}
        BackdropProps={backdropProps}
        disableAutoFocus
      >
        {children}
      </Drawer>
    );
  },
);
