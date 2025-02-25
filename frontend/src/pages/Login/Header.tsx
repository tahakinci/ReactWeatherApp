type Props = {
  header: string;
  subheader: string;
};

const Header = ({ header, subheader }: Props) => {
  return (
    <>
      <h1 className="text-2xl text-center font-bold pb-2">{header}</h1>
      <p className="text-sm text-center">{subheader}</p>
    </>
  );
};

export default Header;
