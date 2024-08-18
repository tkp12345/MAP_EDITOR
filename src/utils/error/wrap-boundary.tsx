import type {PropsWithChildren, ReactElement} from 'react';
import ErrorBoundary from './error-boundary';
import {DefaultErrorFallBack} from './components/default-error-fall-back';
import { CustomErrorClass } from '@/types/error-types';

interface AsyncBoundaryProps {
  defaultErrorMsg?: string;
  loadingFallback?: ReactElement;
  errorFallback?: ReactElement;
  errorFallbackHeight?: string;
  defaultErrorFallBackWrap?: ReactElement;
  ignoreError?: CustomErrorClass[];
}

export const WrapBoundary = ({
  defaultErrorMsg,
  children,
  errorFallback,
  errorFallbackHeight,
  defaultErrorFallBackWrap,
  ignoreError = [],
}: PropsWithChildren<AsyncBoundaryProps>) => {

  //전역범위 에서 처리할 에러
  return (
    <ErrorBoundary
      fallback={
        errorFallback || (
          <DefaultErrorFallBack
            defaultErrorFallBackWrap={defaultErrorFallBackWrap}
            defaultErrorMsg={defaultErrorMsg}
            height={errorFallbackHeight}
          />
        )
      }
      ignoreError={new Set([ ...ignoreError])}
    >
        {children}
    </ErrorBoundary>
  );
};
