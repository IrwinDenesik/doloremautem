import type { BoxProps } from '@mui/material';
import { Box, Skeleton } from '@mui/material';
import { Card } from '../Card';
import type { SwapRouteCardSkeletonProps } from './types';

export const SwapRouteCardSkeleton: React.FC<
  SwapRouteCardSkeletonProps & BoxProps
> = ({ variant, ...other }) => {
  return (
    <Card dense={variant === 'dense'} indented {...other}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Skeleton
          variant="rectangular"
          width={118}
          height={24}
          sx={{ borderRadius: 0.5 }}
        />
        {variant === 'stretched' ? (
          <Box display="flex">
            <Skeleton
              variant="text"
              width={52}
              height={24}
              sx={{ marginRight: 2 }}
            />
            <Skeleton
              variant="text"
              width={44}
              height={24}
              sx={{ marginRight: 2 }}
            />
            <Skeleton variant="text" width={32} height={24} />
          </Box>
        ) : null}
      </Box>
      <Box mt={2}>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
          <Skeleton variant="text" width={96} height={32} />
        </Box>
        <Box ml={6} display="flex" alignItems="center">
          <Skeleton
            variant="text"
            width={102}
            height={16}
            sx={{ borderRadius: 0.5 }}
          />
          {variant === 'stretched' ? (
            <Skeleton
              variant="text"
              width={72}
              height={16}
              sx={{ marginLeft: 1 }}
            />
          ) : null}
        </Box>
      </Box>
      {variant !== 'stretched' ? (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Skeleton variant="text" width={48} height={24} />
          <Skeleton variant="text" width={48} height={24} />
        </Box>
      ) : null}
    </Card>
  );
};
