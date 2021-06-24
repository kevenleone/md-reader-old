import ClayLoadingIndicator from "@clayui/loading-indicator";
import classNames from "classnames";
import React from "react";

const Loading = ({ className }) => (
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
      return <Loading className={className} />;
    }

    return <Component {...restProps} />;
  };

  return Wrapper;
};

export default Loading;
