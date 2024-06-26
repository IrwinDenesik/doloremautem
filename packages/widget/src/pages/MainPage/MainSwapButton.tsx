import { forwardRef } from 'react';
import { useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SwapButton } from '../../components/SwapButton';
import { useSwapRoutes } from '../../hooks';
import { useSetExecutableRoute } from '../../stores';
import { navigationRoutes } from '../../utils';

export const MainSwapButton: React.FC = forwardRef<HTMLButtonElement, {}>(
  (_, ref) => {
    const navigate = useNavigate();
    const { isValid, isValidating } = useFormState();
    const setExecutableRoute = useSetExecutableRoute();

    const { routes: swapRoutes, isLoading, isFetching } = useSwapRoutes();

    const currentRoute = swapRoutes?.[0];

    const handleClick = async () => {
      if (currentRoute) {
        setExecutableRoute(currentRoute);
        navigate(navigationRoutes.swapExecution, {
          state: { routeId: currentRoute.id },
        });
      }
    };

    return (
      <SwapButton
        onClick={handleClick}
        currentRoute={currentRoute}
        disable={isLoading || isFetching || isValidating || !isValid}
        ref={ref}
      />
    );
  },
);
