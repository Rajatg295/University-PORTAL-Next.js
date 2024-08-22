export const MPSItemTemplate = ({
  CommandName = 'NA',
  children,
  footer,
}: {
  CommandName?: string;
  children: JSX.Element;
  footer?: JSX.Element;
}) => children;
