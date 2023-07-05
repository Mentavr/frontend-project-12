import React from "react";
import { useTranslation } from 'react-i18next';
import routes from '../../routesSpi';

const LoadingPage = ({ exitHandler }) => {
    const { t } = useTranslation();
    const {chatPath} = routes;
  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={chatPath()}>
                {t("text.hexletHeader")}
              </a>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => exitHandler()}
              >
                {t("text.exit")}
              </button>
            </div>
          </nav>
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div role="status" className="spinner-border text-primary">
              <span className="visually-hidden">{t("text.loading")}</span>
            </div>
          </div>
          a
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;