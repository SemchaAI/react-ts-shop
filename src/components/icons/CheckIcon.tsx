import { IClassName } from './props';

export default function CheckIcon({ className }: IClassName) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00039 16.2L4.80039 12L3.40039 13.4L9.00039 19L21.0004 7.00001L19.6004 5.60001L9.00039 16.2Z"
      />
    </svg>
  );
}
