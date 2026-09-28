import { Link } from "react-router-dom";
import "./PoliticaDePrivacidade.css";

const PoliticaDePrivacidade = () => {
  return (
    <main className="privacy-page">
      <div className="privacy-container">
        <header className="privacy-header">
          <Link
            to="/cadastro"
            className="privacy-back-link"
            aria-label="Voltar para a página de cadastro"
          >
            ← Voltar
          </Link>

          <div className="privacy-brand">
            <span className="privacy-brand-mark">
              NA
            </span>

            <div>
              <strong>Noir Avenue</strong>
              <span>Privacidade e proteção de dados</span>
            </div>
          </div>

          <div className="privacy-heading">
            <span className="privacy-eyebrow">
              DOCUMENTO OFICIAL
            </span>

            <h1>Política de Privacidade</h1>

            <p>
              Saiba quais dados pessoais podem ser tratados
              pela Noir Avenue, para quais finalidades e quais
              são os seus direitos.
            </p>
          </div>

          <div className="privacy-meta">
            <span>
              <strong>Versão:</strong> 1.0
            </span>

            <span>
              <strong>Última atualização:</strong>{" "}
              28 de setembro de 2026
            </span>
          </div>
        </header>

        <div className="privacy-layout">
          <aside className="privacy-sidebar">
            <nav aria-label="Índice da Política de Privacidade">
              <p>Índice</p>

              <a href="#objetivo">1. Objetivo</a>
              <a href="#controlador">2. Controlador</a>
              <a href="#dados">3. Dados tratados</a>
              <a href="#finalidades">4. Finalidades</a>
              <a href="#bases">5. Bases legais</a>
              <a href="#compartilhamento">6. Compartilhamento</a>
              <a href="#armazenamento">7. Armazenamento</a>
              <a href="#seguranca">8. Segurança</a>
              <a href="#cookies">9. Cookies e tecnologias</a>
              <a href="#direitos">10. Direitos do titular</a>
              <a href="#exclusao">11. Exclusão de dados</a>
              <a href="#menores">12. Crianças e adolescentes</a>
              <a href="#alteracoes">13. Alterações</a>
              <a href="#contato">14. Contato</a>
            </nav>
          </aside>

          <article className="privacy-content">
            <section className="privacy-intro">
              <p>
                A Noir Avenue valoriza a privacidade e busca
                tratar dados pessoais de maneira transparente,
                segura e compatível com a legislação aplicável.
              </p>

              <p>
                Esta Política explica como informações pessoais
                podem ser coletadas, utilizadas, armazenadas e
                eventualmente compartilhadas durante a utilização
                da plataforma.
              </p>
            </section>

            <section id="objetivo">
              <span className="privacy-section-number">
                01
              </span>

              <h2>1. Objetivo desta Política</h2>

              <p>
                Esta Política de Privacidade tem como objetivo
                informar o usuário sobre as práticas relacionadas
                ao tratamento de dados pessoais na Noir Avenue.
              </p>

              <p>
                O documento busca oferecer informações claras
                sobre as categorias de dados tratadas, suas
                finalidades, fundamentos legais, segurança,
                compartilhamento, retenção e direitos do titular.
              </p>
            </section>

            <section id="controlador">
              <span className="privacy-section-number">
                02
              </span>

              <h2>2. Quem é o responsável pelo tratamento</h2>

              <p>
                Para os tratamentos realizados no contexto da
                Noir Avenue, o responsável pelas decisões sobre
                as finalidades e elementos essenciais do
                tratamento deverá ser identificado abaixo.
              </p>

              <div className="privacy-card">
                <span>Controlador</span>

                <strong>
                  [NOME / RAZÃO SOCIAL DO CONTROLADOR]
                </strong>

                <p>
                  CNPJ/CPF: [PREENCHER]
                </p>

                <p>
                  Endereço: [PREENCHER]
                </p>

                <p>
                  Canal de privacidade:{" "}
                  <strong>
                    [luizfelipeolsouz@gmail.com]
                  </strong>
                </p>
              </div>

              <p className="privacy-warning">
                Estes campos devem ser preenchidos antes da
                publicação definitiva da Política.
              </p>
            </section>

            <section id="dados">
              <span className="privacy-section-number">
                03
              </span>

              <h2>3. Quais dados pessoais podem ser tratados</h2>

              <p>
                Dependendo dos recursos utilizados pelo usuário,
                a Noir Avenue poderá tratar diferentes categorias
                de dados pessoais.
              </p>

              <div className="privacy-data-grid">
                <div>
                  <h3>Dados de cadastro</h3>

                  <p>
                    Nome, endereço de e-mail e informações
                    fornecidas durante a criação ou atualização
                    da conta.
                  </p>
                </div>

                <div>
                  <h3>Dados de perfil</h3>

                  <p>
                    Informações adicionadas voluntariamente pelo
                    usuário ao seu perfil e configurações.
                  </p>
                </div>

                <div>
                  <h3>Dados de autenticação</h3>

                  <p>
                    Informações necessárias para autenticar,
                    proteger e manter a sessão do usuário.
                  </p>
                </div>

                <div>
                  <h3>Dados técnicos</h3>

                  <p>
                    Informações técnicas necessárias para
                    funcionamento, segurança, diagnóstico e
                    melhoria da plataforma.
                  </p>
                </div>

                <div>
                  <h3>Dados de utilização</h3>

                  <p>
                    Informações relacionadas à interação do
                    usuário com determinados recursos do
                    serviço.
                  </p>
                </div>

                <div>
                  <h3>Dados fornecidos voluntariamente</h3>

                  <p>
                    Informações inseridas pelo usuário em
                    campos, formulários ou funcionalidades
                    disponibilizadas pela plataforma.
                  </p>
                </div>
              </div>

              <div className="privacy-note">
                <strong>Não solicitamos dados desnecessários.</strong>

                <p>
                  A Noir Avenue busca limitar a coleta às
                  informações necessárias para as finalidades
                  informadas ao usuário.
                </p>
              </div>
            </section>

            <section id="finalidades">
              <span className="privacy-section-number">
                04
              </span>

              <h2>4. Para que utilizamos os dados</h2>

              <p>
                Os dados pessoais podem ser tratados para
                finalidades como:
              </p>

              <ul className="privacy-list">
                <li>
                  Criar e administrar a conta do usuário.
                </li>

                <li>
                  Realizar autenticação e controle de acesso.
                </li>

                <li>
                  Permitir o funcionamento das funcionalidades
                  disponibilizadas.
                </li>

                <li>
                  Personalizar determinadas configurações e
                  experiências da plataforma.
                </li>

                <li>
                  Processar solicitações realizadas pelo usuário.
                </li>

                <li>
                  Detectar, prevenir e investigar atividades
                  fraudulentas ou abusivas.
                </li>

                <li>
                  Proteger a segurança da plataforma.
                </li>

                <li>
                  Corrigir erros e melhorar funcionalidades.
                </li>

                <li>
                  Cumprir obrigações legais e regulatórias.
                </li>

                <li>
                  Exercer regularmente direitos em processos
                  judiciais, administrativos ou arbitrais,
                  quando aplicável.
                </li>
              </ul>
            </section>

            <section id="bases">
              <span className="privacy-section-number">
                05
              </span>

              <h2>5. Bases legais</h2>

              <p>
                O tratamento de dados pessoais será realizado
                conforme uma base legal aplicável ao contexto
                específico.
              </p>

              <p>
                Dependendo da finalidade, poderão ser utilizadas,
                entre outras hipóteses previstas na legislação,
                bases como execução de contrato, cumprimento de
                obrigação legal ou regulatória, exercício regular
                de direitos, legítimo interesse ou consentimento,
                quando aplicável.
              </p>

              <p>
                Quando o tratamento depender de consentimento,
                este deverá ser solicitado de maneira adequada e
                poderá ser revogado pelo titular nas condições
                previstas na legislação.
              </p>
            </section>

            <section id="compartilhamento">
              <span className="privacy-section-number">
                06
              </span>

              <h2>6. Compartilhamento de dados</h2>

              <p>
                A Noir Avenue não comercializa dados pessoais
                como produto.
              </p>

              <p>
                Dados poderão ser compartilhados com fornecedores
                e prestadores de serviços quando isso for
                necessário para determinadas operações da
                plataforma, sempre observadas as finalidades
                aplicáveis e os requisitos legais.
              </p>

              <p>
                Também poderá haver compartilhamento quando
                necessário para cumprimento de obrigação legal,
                determinação de autoridade competente, exercício
                regular de direitos ou proteção da plataforma e
                de seus usuários.
              </p>

              <h3>Prestadores de tecnologia</h3>

              <p>
                Dependendo da arquitetura utilizada, poderão
                existir fornecedores responsáveis por hospedagem,
                infraestrutura, envio de e-mails, armazenamento,
                autenticação, monitoramento ou outros serviços
                técnicos.
              </p>
            </section>

            <section id="armazenamento">
              <span className="privacy-section-number">
                07
              </span>

              <h2>7. Armazenamento e retenção</h2>

              <p>
                Os dados pessoais serão armazenados pelo período
                necessário para cumprir as finalidades descritas
                nesta Política, atender obrigações legais e
                regulatórias ou exercer direitos legítimos.
              </p>

              <p>
                Quando não houver mais necessidade de retenção,
                os dados poderão ser eliminados, anonimizados ou
                submetidos a outra forma de tratamento permitida
                pela legislação.
              </p>

              <p>
                A exclusão da conta não necessariamente implica
                eliminação imediata de todas as informações,
                especialmente quando houver fundamento legal
                que exija ou permita sua conservação.
              </p>
            </section>

            <section id="seguranca">
              <span className="privacy-section-number">
                08
              </span>

              <h2>8. Segurança da informação</h2>

              <p>
                A Noir Avenue adota medidas técnicas e
                administrativas destinadas a proteger os dados
                pessoais contra acessos não autorizados e
                situações acidentais ou ilícitas de destruição,
                perda, alteração, comunicação ou difusão.
              </p>

              <ul className="privacy-list">
                <li>
                  Controle de acesso aos sistemas.
                </li>

                <li>
                  Proteção das credenciais de autenticação.
                </li>

                <li>
                  Restrições de acesso conforme necessidade.
                </li>

                <li>
                  Medidas destinadas a reduzir riscos de acesso
                  não autorizado.
                </li>

                <li>
                  Procedimentos para identificação e tratamento
                  de incidentes de segurança.
                </li>
              </ul>

              <div className="privacy-note">
                <strong>
                  Segurança absoluta não pode ser garantida.
                </strong>

                <p>
                  Apesar das medidas adotadas, nenhum sistema
                  conectado à internet é completamente livre de
                  riscos. A Noir Avenue busca continuamente
                  reduzir esses riscos e aprimorar seus controles.
                </p>
              </div>
            </section>

            <section id="cookies">
              <span className="privacy-section-number">
                09
              </span>

              <h2>
                9. Cookies e tecnologias semelhantes
              </h2>

              <p>
                A Noir Avenue poderá utilizar armazenamento local,
                cookies ou tecnologias semelhantes quando
                necessários para funcionamento, autenticação,
                preferências ou segurança da plataforma.
              </p>

              <p>
                A utilização dessas tecnologias poderá variar de
                acordo com as funcionalidades disponíveis em cada
                versão do produto.
              </p>

              <p>
                Quando tecnologias de terceiros forem utilizadas,
                seus respectivos fornecedores poderão possuir
                políticas próprias sobre tratamento de dados.
              </p>
            </section>

            <section id="direitos">
              <span className="privacy-section-number">
                10
              </span>

              <h2>10. Direitos do titular</h2>

              <p>
                Nos termos da legislação aplicável, especialmente
                da Lei Geral de Proteção de Dados Pessoais (LGPD),
                o titular poderá exercer direitos relacionados ao
                tratamento de seus dados pessoais.
              </p>

              <ul className="privacy-list">
                <li>
                  Confirmar a existência de tratamento.
                </li>

                <li>
                  Solicitar acesso aos dados pessoais.
                </li>

                <li>
                  Solicitar correção de dados incompletos,
                  inexatos ou desatualizados.
                </li>

                <li>
                  Solicitar anonimização, bloqueio ou eliminação
                  de dados desnecessários, excessivos ou tratados
                  em desconformidade com a legislação, quando
                  aplicável.
                </li>

                <li>
                  Solicitar portabilidade, observadas as
                  condições e regulamentação aplicáveis.
                </li>

                <li>
                  Solicitar informações sobre compartilhamentos
                  realizados nas hipóteses previstas em lei.
                </li>

                <li>
                  Revogar consentimento quando esta for a base
                  legal do tratamento.
                </li>

                <li>
                  Solicitar revisão de decisões tomadas
                  unicamente com base em tratamento automatizado,
                  quando aplicável.
                </li>
              </ul>

              <p>
                Alguns direitos possuem hipóteses legais de
                limitação ou exceção. A solicitação será analisada
                de acordo com o contexto e com a legislação
                aplicável.
              </p>
            </section>

            <section id="exclusao">
              <span className="privacy-section-number">
                11
              </span>

              <h2>11. Exclusão da conta e dos dados</h2>

              <p>
                O usuário poderá solicitar o encerramento de sua
                conta por meio das funcionalidades disponibilizadas
                pela plataforma ou pelos canais oficiais.
              </p>

              <p>
                Quando a legislação permitir a eliminação, os
                dados poderão ser excluídos ou anonimizados após
                a solicitação.
              </p>

              <p>
                Determinadas informações poderão permanecer
                armazenadas pelo período necessário para cumprir
                obrigações legais, prevenir fraudes, exercer
                direitos ou atender outras hipóteses previstas em
                lei.
              </p>
            </section>

            <section id="menores">
              <span className="privacy-section-number">
                12
              </span>

              <h2>12. Crianças e adolescentes</h2>

              <p>
                A Noir Avenue não pretende coletar
                intencionalmente dados pessoais de crianças ou
                adolescentes em desacordo com as exigências
                legais aplicáveis.
              </p>

              <p>
                Caso seja identificado tratamento realizado de
                maneira inadequada em relação a menores de idade,
                poderão ser adotadas medidas para interromper o
                tratamento e avaliar a eliminação das informações,
                conforme a legislação.
              </p>
            </section>

            <section id="alteracoes">
              <span className="privacy-section-number">
                13
              </span>

              <h2>13. Alterações desta Política</h2>

              <p>
                Esta Política poderá ser atualizada sempre que
                houver alterações relevantes nas funcionalidades,
                processos de tratamento, fornecedores, legislação
                ou práticas de privacidade da Noir Avenue.
              </p>

              <p>
                A versão mais recente estará sempre disponível
                nesta página.
              </p>

              <p>
                Alterações relevantes poderão ser comunicadas por
                meios adequados, quando necessário.
              </p>
            </section>

            <section id="contato">
              <span className="privacy-section-number">
                14
              </span>

              <h2>14. Contato sobre privacidade</h2>

              <p>
                Caso você tenha dúvidas sobre esta Política ou
                queira exercer algum direito relacionado aos seus
                dados pessoais, utilize o canal oficial de
                privacidade da Noir Avenue.
              </p>

              <div className="privacy-contact">
                <span>
                  Canal de privacidade
                </span>

                <strong>
                  [luizfelipeolsouz@gmail.com]
                </strong>

                <small>
                  Substitua este campo pelo endereço oficial
                  destinado às solicitações de privacidade antes
                  da publicação definitiva.
                </small>
              </div>

              <p>
                A ANPD orienta que o titular procure primeiro o
                controlador para exercer seus direitos. Caso a
                situação não seja solucionada, existem canais
                próprios da Autoridade Nacional de Proteção de
                Dados.
              </p>
            </section>

            <footer className="privacy-footer">
              <p>
                © 2026 Noir Avenue. Todos os direitos
                reservados.
              </p>

              <div>
                <Link to="/termos">
                  Termos de Uso
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

export default PoliticaDePrivacidade;

