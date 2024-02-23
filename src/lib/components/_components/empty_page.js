import Navbar from '../components/navbar';
import React  from 'react';


export default function EmptyPage() {
  return (
    <>
      <Navbar showBackButton={false}/>
      <div className="page-content"></div>
    </>
  );
}
