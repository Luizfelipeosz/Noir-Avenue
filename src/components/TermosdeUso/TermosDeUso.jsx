import { Link } from "react-router-dom";
import "./TermosDeUso.css";

const TermosDeUso = () => {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link
            to="/cadastro"
            className="legal-back-link"
            aria-label="Voltar para a página de cadastro"
          >
            ← Voltar
          </Link>

          <div className="legal-brand">
            <span className="legal-brand-mark">NA</span>

            <div>
              <strong>Noir Avenue</strong>
              <span>Documentos legais</span>
            </div>
          </div>

          <div className="legal-heading">
            <span className="legal-eyebrow">
              DOCUMENTO OFICIAL
            </span>

            <h1>Termos de Uso</h1>

            <p>
              As regras que estabelecem as condições para
              utilização da plataforma Noir Avenue.
            </p>
          </div>

          <div className="legal-meta">
            <span>
              <strong>Versão:</strong> 1.0
            </span>

            <span>
              <strong>Última atualização:</strong>{" "}
              28 de setembro de 2026
            </span>
          </div>
        </header>

        <div className="legal-layout">
          <aside className="legal-sidebar">
            <nav aria-label="Índice dos Termos de Uso">
              <p>Índice</p>

              <a href="#aceitacao">1. Aceitação</a>
              <a href="#sobre">2. Sobre a Noir Avenue</a>
              <a href="#conta">3. Conta do usuário</a>
              <a href="#uso-permitido">4. Uso permitido</a>
              <a href="#proibicoes">5. Condutas proibidas</a>
              <a href="#conteudo">6. Conteúdo e propriedade</a>
              <a href="#servicos">7. Disponibilidade</a>
              <a href="#seguranca">8. Segurança</a>
              <a href="#suspensao">9. Suspensão e encerramento</a>
              <a href="#responsabilidades">10. Responsabilidades</a>
              <a href="#privacidade">11. Privacidade</a>
              <a href="#alteracoes">12. Alterações</a>
              <a href="#legislacao">13. Legislação aplicável</a>
              <a href="#contato">14. Contato</a>
            </nav>
          </aside>

          <article className="legal-content">
            <section className="legal-intro">
              <p>
                Estes Termos de Uso estabelecem as regras,
                direitos e responsabilidades relacionados ao
                acesso e utilização da Noir Avenue.
              </p>

              <p>
                Ao criar uma conta, acessar ou utilizar a
                plataforma, você declara que leu, compreendeu
                e concorda com estes Termos, bem como com a
                nossa{" "}
                <Link to="/privacidade">
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            <section id="aceitacao">
              <span className="section-number">01</span>

              <h2>1. Aceitação dos Termos</h2>

              <p>
                A utilização da Noir Avenue está condicionada
                à aceitação destes Termos de Uso.
              </p>

              <p>
                Caso você não concorde com qualquer disposição
                deste documento, não deverá criar uma conta ou
                continuar utilizando os recursos da plataforma.
              </p>

              <p>
                A aceitação realizada durante o cadastro
                representa sua concordância com a versão vigente
                destes Termos na data da aceitação.
              </p>
            </section>

            <section id="sobre">
              <span className="section-number">02</span>

              <h2>2. Sobre a Noir Avenue</h2>

              <p>
                A Noir Avenue é uma plataforma digital
                desenvolvida para oferecer uma experiência de
                navegação, descoberta e simulação de compra de
                produtos em ambiente digital.
              </p>

              <p>
                Alguns recursos podem ser disponibilizados de
                forma experimental ou sofrer alterações durante
                a evolução da plataforma.
              </p>

              <div className="legal-note">
                <strong>Importante</strong>

                <p>
                  A disponibilidade de determinado recurso não
                  significa que ele permanecerá disponível
                  permanentemente ou que possuirá as mesmas
                  características em versões futuras.
                </p>
              </div>
            </section>

            <section id="conta">
              <span className="section-number">03</span>

              <h2>3. Conta do usuário</h2>

              <p>
                Alguns recursos da Noir Avenue exigem a criação
                de uma conta.
              </p>

              <h3>3.1. Informações fornecidas</h3>

              <p>
                O usuário deve fornecer informações verdadeiras,
                completas e atualizadas no momento do cadastro e
                sempre que realizar alterações em seu perfil.
              </p>

              <h3>3.2. Credenciais</h3>

              <p>
                A senha utilizada para acesso à conta é de
                responsabilidade do usuário. Ela deve ser
                mantida em sigilo e não deve ser compartilhada
                com terceiros.
              </p>

              <h3>3.3. Segurança da conta</h3>

              <p>
                Caso o usuário suspeite de acesso não autorizado,
                comprometimento de suas credenciais ou qualquer
                atividade incomum, deverá comunicar o ocorrido
                imediatamente pelos canais disponíveis.
              </p>
            </section>

            <section id="uso-permitido">
              <span className="section-number">04</span>

              <h2>4. Uso permitido</h2>

              <p>
                A Noir Avenue deve ser utilizada de maneira
                legítima, responsável e compatível com estes
                Termos e com a legislação aplicável.
              </p>

              <ul className="legal-list">
                <li>
                  Utilizar a plataforma para suas finalidades
                  legítimas e disponibilizadas pelo produto.
                </li>

                <li>
                  Fornecer informações verdadeiras durante o
                  cadastro e utilização da conta.
                </li>

                <li>
                  Manter suas credenciais de acesso protegidas.
                </li>

                <li>
                  Respeitar os direitos da Noir Avenue e de
                  terceiros.
                </li>

                <li>
                  Utilizar os recursos da plataforma sem tentar
                  prejudicar sua disponibilidade, segurança ou
                  funcionamento.
                </li>
              </ul>
            </section>

            <section id="proibicoes">
              <span className="section-number">05</span>

              <h2>5. Condutas proibidas</h2>

              <p>
                É proibida a utilização da Noir Avenue para
                atividades ilícitas, fraudulentas ou que possam
                comprometer outros usuários, a plataforma ou
                terceiros.
              </p>

              <ul className="legal-list">
                <li>
                  Tentar acessar contas, sistemas ou informações
                  de outros usuários sem autorização.
                </li>

                <li>
                  Utilizar mecanismos para contornar controles
                  de segurança ou autenticação.
                </li>

                <li>
                  Introduzir códigos maliciosos, malware ou
                  qualquer mecanismo destinado a comprometer a
                  plataforma.
                </li>

                <li>
                  Realizar ataques, exploração de vulnerabilidades
                  ou tentativas deliberadas de indisponibilizar
                  serviços.
                </li>

                <li>
                  Utilizar informações falsas para criar ou
                  manter uma conta.
                </li>

                <li>
                  Utilizar a plataforma para práticas fraudulentas
                  ou ilícitas.
                </li>

                <li>
                  Copiar, reproduzir, modificar ou redistribuir
                  componentes proprietários da plataforma sem
                  autorização.
                </li>
              </ul>
            </section>

            <section id="conteudo">
              <span className="section-number">06</span>

              <h2>6. Conteúdo e propriedade intelectual</h2>

              <p>
                A estrutura visual, identidade, código,
                componentes, textos, elementos gráficos e demais
                conteúdos disponibilizados pela Noir Avenue são
                protegidos pela legislação aplicável, salvo
                quando indicado de maneira diferente.
              </p>

              <p>
                O acesso à plataforma não concede ao usuário
                qualquer transferência ou cessão de direitos de
                propriedade intelectual.
              </p>

              <p>
                O usuário não poderá reproduzir, comercializar,
                distribuir ou explorar elementos proprietários
                da plataforma sem autorização adequada.
              </p>
            </section>

            <section id="servicos">
              <span className="section-number">07</span>

              <h2>7. Disponibilidade da plataforma</h2>

              <p>
                A Noir Avenue busca manter seus serviços
                disponíveis, seguros e funcionais, mas não
                garante disponibilidade ininterrupta.
              </p>

              <p>
                Podem ocorrer indisponibilidades decorrentes de
                manutenção, atualizações, falhas técnicas,
                problemas de infraestrutura, serviços de
                terceiros ou acontecimentos fora do controle
                razoável da plataforma.
              </p>
            </section>

            <section id="seguranca">
              <span className="section-number">08</span>

              <h2>8. Segurança</h2>

              <p>
                A Noir Avenue adota medidas técnicas e
                administrativas destinadas a proteger a
                plataforma e os dados tratados contra acessos
                não autorizados e situações acidentais ou
                ilícitas.
              </p>

              <p>
                Nenhum sistema conectado à internet pode ser
                considerado absolutamente imune a riscos.
                Por isso, o usuário também possui responsabilidade
                pela proteção de suas credenciais e dispositivos.
              </p>
            </section>

            <section id="suspensao">
              <span className="section-number">09</span>

              <h2>9. Suspensão e encerramento de conta</h2>

              <p>
                A conta poderá ser suspensa ou encerrada quando
                houver violação destes Termos, utilização
                fraudulenta, risco à segurança da plataforma ou
                outras situações justificadas pela legislação
                aplicável.
              </p>

              <p>
                O usuário também poderá solicitar o encerramento
                de sua conta por meio dos recursos disponibilizados
                pela plataforma.
              </p>

              <p>
                O encerramento da conta não elimina
                automaticamente obrigações legais de retenção
                de determinadas informações, quando houver
                fundamento jurídico para sua conservação.
              </p>
            </section>

            <section id="responsabilidades">
              <span className="section-number">10</span>

              <h2>10. Responsabilidades</h2>

              <h3>10.1. Responsabilidades do usuário</h3>

              <ul className="legal-list">
                <li>
                  Utilizar a plataforma de acordo com estes
                  Termos.
                </li>

                <li>
                  Proteger suas credenciais de acesso.
                </li>

                <li>
                  Fornecer informações verdadeiras e atualizadas.
                </li>

                <li>
                  Responder pelos atos realizados mediante sua
                  conta quando decorrentes de sua própria
                  conduta ou negligência.
                </li>
              </ul>

              <h3>10.2. Responsabilidades da Noir Avenue</h3>

              <ul className="legal-list">
                <li>
                  Buscar manter a plataforma funcionando de
                  maneira adequada.
                </li>

                <li>
                  Adotar medidas razoáveis de segurança.
                </li>

                <li>
                  Tratar dados pessoais conforme a legislação
                  aplicável e a Política de Privacidade.
                </li>

                <li>
                  Disponibilizar informações claras sobre as
                  regras de utilização do serviço.
                </li>
              </ul>
            </section>

            <section id="privacidade">
              <span className="section-number">11</span>

              <h2>11. Privacidade e proteção de dados</h2>

              <p>
                O tratamento de dados pessoais realizado pela
                Noir Avenue é explicado de forma detalhada na
                nossa{" "}
                <Link to="/privacidade">
                  Política de Privacidade
                </Link>
                .
              </p>

              <p>
                A Política de Privacidade integra estes Termos
                para fins de transparência sobre coleta, uso,
                armazenamento, segurança e demais operações
                realizadas com dados pessoais.
              </p>
            </section>

            <section id="alteracoes">
              <span className="section-number">12</span>

              <h2>12. Alterações destes Termos</h2>

              <p>
                Estes Termos poderão ser atualizados para refletir
                mudanças na plataforma, na legislação ou nos
                processos operacionais.
              </p>

              <p>
                Quando uma alteração relevante ocorrer, a Noir
                Avenue buscará disponibilizar comunicação
                adequada aos usuários.
              </p>

              <p>
                A versão vigente será sempre aquela publicada
                nesta página.
              </p>
            </section>

            <section id="legislacao">
              <span className="section-number">13</span>

              <h2>13. Legislação aplicável</h2>

              <p>
                Estes Termos são interpretados de acordo com a
                legislação brasileira aplicável, respeitados os
                direitos assegurados ao usuário pela legislação
                de proteção do consumidor e demais normas
                pertinentes.
              </p>
            </section>

            <section id="contato">
              <span className="section-number">14</span>

              <h2>14. Contato</h2>

              <p>
                Para dúvidas, solicitações ou comunicações
                relacionadas a estes Termos, utilize o canal
                oficial disponibilizado pela Noir Avenue.
              </p>

              <div className="legal-contact">
                <span>Contato oficial</span>

                <strong>
                  luizfelipeolsouz@gmail.com
                </strong>

                <small>
                  Substitua este endereço pelo canal oficial
                  utilizado pelo projeto antes da publicação.
                </small>
              </div>
            </section>

            <footer className="legal-footer">
              <p>
                © 2026 Noir Avenue. Todos os direitos
                reservados.
              </p>

              <div>
                <Link to="/privacidade">
                  Política de Privacidade
                </Link>

                <Link to="/">
                  Entrar
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
};

export default TermosDeUso;