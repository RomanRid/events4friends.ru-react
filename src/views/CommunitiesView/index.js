import React, { useContext, useCallback } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ButtonLink from '../../components/ButtonLink';
import StoreBadge from '../../components/StoreBadge';
import { DataContext } from '../../context/DataContext';
import './CommunitiesView.css';

const CommunitiesView = () => {
  const history = useHistory();
  const { communities: communitiesList } = useContext(DataContext);

  const onCommunityClick = useCallback(
    communityId => {
      // Cookies
      const cookies = new Cookies();
      cookies.set('communityId', communityId);
      history.push('/');
    },
    [history],
  );

  return (
    <div className="communitiesview">
      <div>
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          className="communities-view__button-link"
        />
      </div>
      <div className="border-top mt-3 mb-3">
        <p className="mt-3">Все сообщества Калининграда</p>
        {communitiesList.map(community => (
          <div key={community.id} className="pb-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => onCommunityClick(community.id)}
            >
              <img
                src={`data:image/png;base64, ${community.logo}`}
                alt="Logo"
                width="32"
                height="32"
              />
              <span className="pl-2">{community.name}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>Наше мобильное приложение:</p>
          <div className="d-flex justify-content-center">
            <div className="mr-1">
              <StoreBadge platform="ios" width={120} />
            </div>
            <div className="ml-1">
              <StoreBadge platform="android" width={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CommunitiesView);
