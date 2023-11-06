export interface Header {
  header: any
}

export const Header = ({header}: Header) => {
  console.log('header', header)
  return(
    <header> hellor</header>
  )
}

export default Header