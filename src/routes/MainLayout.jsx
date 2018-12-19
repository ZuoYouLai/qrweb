import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MainLayoutViews from '../components/MainLayout/MainLayout';
import { history } from '../config'

function MainLayout({ children, location , mainLayout}) {
  const {
      loading,
      } = mainLayout;
  return (
      <MainLayoutViews>
        {children}
      </MainLayoutViews>
  );
}

function mapStateToProps({ mainLayout }) {
  return { mainLayout };
}

export default connect(mapStateToProps)(MainLayout)