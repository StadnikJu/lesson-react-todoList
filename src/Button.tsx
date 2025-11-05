type Props = {
  title: string;
  onClickHandler?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({ title, onClickHandler, disabled, className }: Props) => {
  return <button disabled={disabled} onClick={onClickHandler} className={className}>{title}</button>
}
