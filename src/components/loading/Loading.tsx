import ClayLoadingIndicator from "@clayui/loading-indicator";
import classNames from "classnames";
import React from "react";

export const LoadingComponent = ({ className }) => (
  <div
    className={classNames("align-items-center", "d-flex", "w-100", className)}
  >
    <ClayLoadingIndicator />
  </div>
);

export const withLoading = (Component) => {
  const Wrapper = (props) => {
    const { className, isLoading, ...restProps } = props;

    if (isLoading) {
      return <LoadingComponent className={className} />;
    }

    return <Component {...restProps} />;
  };

  return Wrapper;
};
