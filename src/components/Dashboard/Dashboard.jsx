import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaHeart,
    FaCrown,
    FaCog,
    FaSignOutAlt,
    FaClock
} from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("noiravenue_user")
        ) || {
            nome: "Luiz Felipe"
        };

    const logout = () => {
        localStorage.removeItem(
            "noiravenue_session"
        );

        navigate("/");
    };

    return (
        <div className="dashboard-container">

            <header className="dashboard-header">

                <div>
                    <h1>
                        Olá, {user.nome}.
                    </h1>

                    <p>
                        Bem-vindo de volta à Noir Avenue.
                    </p>
                </div>

                <button onClick={logout}>
                    <FaSignOutAlt />
                    Sair
                </button>

            </header>

            <section className="dashboard-banner">

                <div className="banner-content">
                    <h2>
                        Experiência Noir Avenue
                    </h2>

                    <p>
                        Uma plataforma desenvolvida para
                        oferecer elegância, exclusividade
                        e tecnologia em cada interação.
                    </p>
                </div>

            </section>

            <section className="dashboard-stats">

                <div className="card">
                    <h3>Favoritos</h3>
                    <span>12</span>
                </div>

                <div className="card">
                    <h3>Coleções</h3>
                    <span>04</span>
                </div>

                <div className="card">
                    <h3>Noir Premium</h3>
                    <span>Ativo</span>
                </div>

                <div className="card">
                    <h3>Último acesso</h3>
                    <span>Hoje</span>
                </div>

            </section>

            <section className="dashboard-actions">

                <div className="action-card">
                    <FaUser />

                    <h3>Meu Perfil</h3>

                    <p>
                        Atualize suas informações
                        pessoais e acompanhe sua
                        atividade.
                    </p>
                </div>

                <div className="action-card">
                    <FaHeart />

                    <h3>Favoritos</h3>

                    <p>
                        Acesse rapidamente seus itens
                        favoritos.
                    </p>
                </div>

                <div className="action-card">
                    <FaCog />

                    <h3>Configurações</h3>

                    <p>
                        Personalize sua experiência
                        dentro da plataforma.
                    </p>
                </div>

                <div className="action-card">
                    <FaCrown />

                    <h3>Noir Premium</h3>

                    <p>
                        Descubra recursos exclusivos e
                        benefícios premium.
                    </p>
                </div>

                <div className="action-card">
                    <FaClock />

                    <h3>Histórico</h3>

                    <p>
                        Consulte seus acessos e ações
                        recentes.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Dashboard;