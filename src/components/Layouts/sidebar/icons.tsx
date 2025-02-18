import { SVGProps } from "react";

export type PropsType = SVGProps<SVGSVGElement>;

export function CheckInIcon(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v6h-2V5H6v14h12v-5h2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm10 5l4 4-4 4v-3h-4v-2h4V9z" />
    </svg>
  );
}


export function WalkInIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2a2 2 0 11.001 4.001A2 2 0 0112 2zm-2 5h4a2 2 0 012 2v1h3a1 1 0 011 1v9a1 1 0 01-1 1H9v-2h9v-7h-2v4a1 1 0 11-2 0v-4h-2v7H9v-4a1 1 0 011-1h2V9h-2v1a1 1 0 01-2 0V9a2 2 0 012-2zm-4 11a2 2 0 012 2v1h-2v-1a1 1 0 00-2 0v1H4v-1a2 2 0 012-2z" />
    </svg>
  );
}

export function CheckOutIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M14 2a2 2 0 012 2v4h2V4a4 4 0 00-4-4H6a2 2 0 00-2 2v18a2 2 0 002 2h8a2 2 0 002-2v-6h-2v6H6V4h8zm5.707 9.293a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L18.586 12H14a1 1 0 110-2h4.586l-2.293-2.293a1 1 0 011.414-1.414l2 2a1 1 0 010 1.414z" />
    </svg>
  );
}



export function AvailabilityIcon(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M6 2a1 1 0 011 1v1h10V3a1 1 0 112 0v1h2a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 011-1zm13 8H5v10h14V10zm-3.293 3.707l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 111.414-1.414l.793.793 2.293-2.293a1 1 0 111.414 1.414z" />
    </svg>
  );
}

export function ReservationIcon(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M17 2h-2V1a1 1 0 00-2 0v1H7V1a1 1 0 00-2 0v1H4a2 2 0 00-2 2v18a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm0 18H7V6h10v14zm-4.707-7.707a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-1.293-1.293-1.293 1.293a1 1 0 01-1.414-1.414l2-2z" />
    </svg>
  );
}
  export function ReportsIcon(props: PropsType) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M17 2H7c-1.1 0-1.99.9-1.99 2L5 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H7V4h10v14zm-4-7h-2v3H9v-3H7v5h5v-5zm0-4h-2v2H9V7H7V5h5v2z" />
      </svg>
    );
  }
  

