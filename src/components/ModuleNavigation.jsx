import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ModuleNavigation = ({ id, proximoModulo, concluido, handleVoltar }) => (
  <div className="modulo-navegacao">
    {parseInt(id) > 1 ? (
      <Link to={`/modulo/${parseInt(id) - 1}`} className="btn btn-secondary">
        <ArrowLeft size={20} />
        Módulo Anterior
      </Link>
    ) : (
      <span />
    )}
    {proximoModulo ? (
      <Link to={`/modulo/${proximoModulo}`} className="btn btn-primary">
        <CheckCircle size={20} />
        Próximo Módulo
      </Link>
    ) : (
      <button onClick={handleVoltar} className="btn btn-primary">
        Concluir Implantação
      </button>
    )}
  </div>
);

export default ModuleNavigation;
