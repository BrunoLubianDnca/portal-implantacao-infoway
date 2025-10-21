import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle, X, Image } from 'lucide-react';

const ModuleContent = ({ conteudo, useTabs, tabs, activeTab, setActiveTab, openLightbox, concluido, setBlockedTabName, setShowTabBlockedModal }) => {
  if (useTabs && tabs) {
    return (
      <div className="content-tabs">
        <div className="tabs-header">
          {Object.entries(tabs).map(([key, tab]) => {
            const IconComponent = tab.icon === 'HeadphonesIcon' ? HeadphonesIcon : 
                                 tab.icon === 'Shield' ? Shield : Sparkles;
            return (
              <button
                key={key}
                className={`tab-button ${activeTab === key ? 'active' : ''}`}
                onClick={() => {
                  if (!concluido && key !== 'suporte') {
                    setBlockedTabName(tab.label);
                    setShowTabBlockedModal(true);
                  } else {
                    setActiveTab(key);
                  }
                }}
              >
                <IconComponent className="tab-icon" size={20} />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="tabs-content">
          {tabs[activeTab].conteudo.map((item, index) => {
            switch (item.tipo) {
              case 'titulo':
                return <h2 key={index} className="content-titulo">{item.texto}</h2>;
              case 'paragrafo':
                return <p key={index} className="content-paragrafo">{item.texto}</p>;
              case 'lista':
                return (
                  <ul key={index} className="content-lista">
                    {item.itens.map((subitem, subindex) => (
                      <li key={subindex}>
                        <CheckCircle size={18} />
                        <span>{subitem}</span>
                      </li>
                    ))}
                  </ul>
                );
              case 'lista-negativa':
                return (
                  <ul key={index} className="content-lista content-lista-negativa">
                    {item.itens.map((subitem, subindex) => (
                      <li key={subindex}>
                        <X size={18} style={{ color: '#ef4444' }} />
                        <span>{subitem}</span>
                      </li>
                    ))}
                  </ul>
                );
              case 'dica':
                return (
                  <div key={index} className="content-box dica">
                    <Lightbulb size={20} />
                    <span>{item.texto}</span>
                  </div>
                );
              case 'destaque':
                return (
                  <div key={index} className="content-box destaque-importante">
                    <AlertCircle size={20} />
                    <span>{item.texto}</span>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  }
  // Conteúdo normal para módulos sem tabs
  return (
    <div className="tutorial-content">
      {conteudo && conteudo.map((item, index) => {
        switch (item.tipo) {
          case 'titulo':
            return <h2 key={index} className="content-titulo">{item.texto}</h2>;
          case 'paragrafo':
            return <p key={index} className="content-paragrafo">{item.texto}</p>;
          case 'codigo':
            return (
              <div key={index} className="content-codigo">
                <code>{item.texto}</code>
              </div>
            );
          case 'lista':
            return (
              <ul key={index} className="content-lista">
                {item.itens.map((subitem, subindex) => (
                  <li key={subindex}>
                    <CheckCircle size={18} />
                    <span>{subitem}</span>
                  </li>
                ))}
              </ul>
            );
          case 'lista-negativa':
            return (
              <ul key={index} className="content-lista content-lista-negativa">
                {item.itens.map((subitem, subindex) => (
                  <li key={subindex}>
                    <X size={18} style={{ color: '#ef4444' }} />
                    <span>{subitem}</span>
                  </li>
                ))}
              </ul>
            );
          case 'dica':
            return (
              <div key={index} className="content-box dica">
                <Lightbulb size={20} />
                <span>{item.texto}</span>
              </div>
            );
          case 'destaque':
            return (
              <div key={index} className="content-box destaque-importante">
                <AlertCircle size={20} />
                <span>{item.texto}</span>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ModuleContent;
