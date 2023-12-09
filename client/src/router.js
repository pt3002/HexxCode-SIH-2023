import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import CurriculumDeveloperLayout from './layouts/CurriculumDeveloperLayout';
import EducatorLayout from './layouts/EDLayout';
import Checkout from './content/pages/registerSteps';
import Page1New from './content/pages/page_one_new';
import Page2New from './content/pages/page_two_new';
import Page3New from './content/pages/page_three_new';
import CurriculumDeveloperLogin from './content/pages/login-user';
import SubjectsForResources from './content/pages/CD/subjectsForResources';
import Requirements from './content/pages/ED/requirements';
import Dashboard from './content/pages/ED/dashboard';
import AICTELayout from './layouts/AICTELayout'
import AddSubjHeads from './content/pages/AICTE/AddDeptHeads';
import AddDeptHeads from './content/pages/AICTE/AddDeptHeads';
import AddDepartment from './content/pages/AICTE/AddDepartment';
import NotifyCDS from './content/pages/AICTE/NotifyCDS';
import NotifyEducators from './content/pages/AICTE/NotifyEducators';
import AddGuidelines from './content/pages/AICTE/AddGuidelines';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('./content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('./content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('./content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('./content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('./content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('./content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('./content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('./content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('./content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('./content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('./content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('./content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('./content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('./content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('./content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('./content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('./content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('./content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('./content/pages/Status/Maintenance'))
);

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  },
  {
    path : 'curriculumDeveloper',
    element : <CurriculumDeveloperLayout />,
    children : [
      {
        path : 'subjects',
        element : <SubjectsForResources />
      }
    ]
  },
  {
    path : 'ED',
    element : <EducatorLayout />,
    children : [
      {
        path : 'dashboard',
        element : <Dashboard />
      },
      {
        path : 'requirements',
        element : <Requirements />
      },
    ]
  },
  {
    path : '/register',
    element : <Checkout />,
    children : [
      {
        path: 'page1',
        element: <Page1New />
      },
      {
        path: '',
        element: <Navigate to="page2" replace />
      },
      {
        path: 'page2',
        element: <Page2New />
      },
      {
        path: '',
        element: <Navigate to="page3" replace />
      },
      {
        path: 'page3',
        element: <Page3New />
      }
    ]
  },
  {
    path : 'login',
    element : <CurriculumDeveloperLogin />,
    children : [
      
    ]
  },
  {
    path : 'aicte',
    element : <AICTELayout />,
    children : [
      {
        path: 'addDeptHeads',
        element: <AddDeptHeads />
      },
      {
        path: 'addDepartment',
        element: <AddDepartment />
      },
      {
        path: 'notifyCD',
        element: <NotifyCDS />
      },
      {
        path: 'notifyEducators',
        element: <NotifyEducators/>
      },
      {
        path: 'addGuidelines',
        element : <AddGuidelines />
      }
    ]
  },
];

export default routes;
