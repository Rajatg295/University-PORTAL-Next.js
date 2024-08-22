const FooterPart = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <div>{new Date().getFullYear()} © Metaponder.</div>
            {/* <script>document.write(new Date().getFullYear())</script> © Minia. */}
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Develop by{' '}
              <a href="#" className="text-decoration-underline">
                Metaponder
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPart;
