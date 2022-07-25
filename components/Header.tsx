import { NextPage } from 'next';
import Image from 'next/image';
import enzo_logo from './/../images/enzo_logo.jpeg';

const Header: NextPage = () => {
  return (
    <section id='header'>
      <Image src={enzo_logo} height={100} width={100} alt='Enzo Logo' />
    </section>
  );
};

export default Header;
