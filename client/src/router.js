import { Suspense, lazy, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import UserTokenContext from './contexts/UserTokenContext';
import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';
import DashboardDeptHead from './content/pages/DeptHead/dashboard';
import SuspenseLoader from './components/SuspenseLoader';
import CurriculumDeveloperLayout from './layouts/CurriculumDeveloperLayout';
import DeptHeadLayout from './layouts/DeptHeadLayout';
import EducatorLayout from './layouts/EDLayout';
import Checkout from './content/pages/registerSteps';
import Page1New from './content/pages/page_one_new';
import Page2New from './content/pages/page_two_new';
import Page3New from './content/pages/page_three_new';
import CurriculumDeveloperLogin from './content/pages/login-user';
import SubjectsForResources from './content/pages/CD/subjectsForResources';
import DashboardED from './content/pages/ED/dashboard';
import AICTELayout from './layouts/AICTELayout'
import AddDeptHeads from './content/pages/AICTE/AddDeptHeads';
import AddDepartment from './content/pages/AICTE/AddDepartment';
import NotifyCDS from './content/pages/AICTE/NotifyCDS';
import NotifyEducators from './content/pages/AICTE/NotifyEducators';
import AddGuidelines from './content/pages/AICTE/AddGuidelines';
import RegisterEducator from './content/pages/ED/register-educator';
import Courses from './content/pages/CD/courses';
import Document from './content/pages/CD/document';
import ViewGuidelines from './content/pages/CD/ViewGuidelines';
import ViewGuidelinesED from './content/pages/ED/ViewGuidelines';
import CreateDocument from './content/pages/CD/createDocument';
import PostRequirements from './content/pages/ED/ed-requirements';
import ViewRequirements from './content/pages/CD/view-requirements';
import ApproveCurriculumDevelopers from './content/pages/AICTE/ApproveCurriculumDevelopers';
import EDviewcurri from './content/pages/ED/review';
import TestComp from './content/pages/ED/ratepage';
import Calendar from './content/pages/CD/calendar';
import DiscussionForum from './content/pages/CD/discussionForum';
import { CreateGroup } from './content/pages/DeptHead/CreateGroup';
import ViewGroups from './content/pages/DeptHead/ViewGroups';
import GroupInfo from './content/pages/DeptHead/GroupInfo';
import Chat from './content/pages/CD/chat';
import AdminChart from './content/pages/AICTE/AdminChart';
import EducatorFeedback from './content/pages/ED/feedback-page';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const DynamicRoutes = () =>{


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

  const role = localStorage.getItem("shiksha-niyojak-role");
  let   all_routes = [    {
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
    path : 'register-educator',
    element : <RegisterEducator />,
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
        element: <AddGuidelines />
      },
      {
        path: 'approveCDs',
        element : <ApproveCurriculumDevelopers />
      },
      {
        path: 'adminChart',
        element : <AdminChart />
      }
    ]
  },{
    path : 'curriculumDeveloper',
    element : <DeptHeadLayout />,
    children : [{
      path : 'discussionForum',
      element : <DiscussionForum />
    },]}]
  if(role == "Educator"){
    all_routes.push({
      path : 'ED',
      element : <EducatorLayout />,
      children : [
        {
          path : 'dashboard',
          element : <DashboardED />
        },
        {
          path : 'requirements',
          element : <PostRequirements />
        },
        {
          path : 'viewGuidelines',
          element : <ViewGuidelinesED />
        },
        {
          path : 'review',
          element : <EDviewcurri />
        },
        {
          path : 'rate',
          element : <EducatorFeedback />
        },
      ]
    })
  }else if(role == "DepartmentHead"){
    all_routes.push(
    {
      path : 'deptHead',
      element : <DeptHeadLayout />,
      children : [
        {
          path: 'overview',
          element: <DashboardDeptHead />
        },
        {
          path: 'createGroup',
          element: <CreateGroup />
        },
        {
          path: 'viewGroups',
          element: <ViewGroups />
        },
        {
          path: 'viewGroupInfo',
          element: <GroupInfo />
        },
        {
          path : 'viewRequirements',
          element : <ViewRequirements />
        },
        {
          path : 'viewGuidelines',
          element : <ViewGuidelines/>
        },
      ]
    })
  }else if(role == "CurriculumDeveloper"){
    all_routes.push(
      {
        path : 'curriculumDeveloper',
        element : <CurriculumDeveloperLayout />,
        children : [
          {
            path : 'books',
            element : <SubjectsForResources />
          },
          {
            path: 'subjects',
            element : <Courses />
          },
          {
            path : 'document',
            element : <Document />
          },
          {
            path : 'viewGuidelines',
            element : <ViewGuidelines/>
          },
          {
            path : 'createDocument',
            element : <CreateDocument />
          },
          {
            path : 'calendar',
            element : <Calendar />
          },
          {
            path : 'chat',
            element : <Chat />
          },
    
          {
            path : 'viewRequirements',
            element : <ViewRequirements />
          }
    
        ]
      })
  }   
  const routes = useRoutes(all_routes);
  return routes;
}
export default DynamicRoutes;
