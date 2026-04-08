import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-name">
              <span>P&D Connect</span>
            </div>
            <p className="footer__brand-text">
              Conectando empresas a pesquisadores para impulsionar a inovação tecnológica no Brasil. Alinhado com a ODS 9 da ONU.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Plataforma</h4>
            <Link to="/como-funciona">Como Funciona</Link>
            <Link to="/indicadores">Indicadores</Link>
            <Link to="/login">Entrar</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Institucional</h4>
            <Link to="/sobre">Sobre Nós</Link>
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
            <a href="#">Contato</a>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Parceiros</h4>
            <a href="#">CNPq</a>
            <a href="#">MCTI</a>
            <a href="#">CAPES</a>
            <a href="#">IBGE</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 P&D Connect. Todos os direitos reservados.</span>
          <div className="footer__bottom-links">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
