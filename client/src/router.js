import { Suspense, lazy, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useContext } from "react";
import UserTokenContext from "./contexts/UserTokenContext";
import SidebarLayout from "./layouts/SidebarLayout";
import BaseLayout from "./layouts/BaseLayout";
import DashboardDeptHead from "./content/pages/DeptHead/dashboard";
import SuspenseLoader from "./components/SuspenseLoader";
import CurriculumDeveloperLayout from "./layouts/CurriculumDeveloperLayout";
import DeptHeadLayout from "./layouts/DeptHeadLayout";
import EducatorLayout from "./layouts/EDLayout";
import Checkout from "./content/pages/registerSteps";
import Page1New from "./content/pages/page_one_new";
import Page2New from "./content/pages/page_two_new";
import Page3New from "./content/pages/page_three_new";
import { OtpScript } from "./content/pages/otpscript";
import CurriculumDeveloperLogin from "./content/pages/login-user";
import SubjectsForResources from "./content/pages/CD/subjectsForResources";
import DashboardED from "./content/pages/ED/dashboard";
import AICTELayout from "./layouts/AICTELayout";
import AddDeptHeads from "./content/pages/AICTE/AddDeptHeads";
import AddDepartment from "./content/pages/AICTE/AddDepartment";
import NotifyCDS from "./content/pages/AICTE/NotifyCDS";
import NotifyEducators from "./content/pages/AICTE/NotifyEducators";
import AddGuidelines from "./content/pages/AICTE/AddGuidelines";
import RegisterEducator from "./content/pages/ED/register-educator";
import Courses from "./content/pages/CD/courses";
import Document from "./content/pages/CD/document";
import ViewGuidelines from "./content/pages/CD/ViewGuidelines";
import ViewGuidelinesED from "./content/pages/ED/ViewGuidelines";
import CreateDocument from "./content/pages/CD/createDocument";
import PostRequirements from "./content/pages/ED/ed-requirements";
import ViewRequirements from "./content/pages/CD/view-requirements";
import ApproveCurriculumDevelopers from "./content/pages/AICTE/ApproveCurriculumDevelopers";
import EDviewcurri from "./content/pages/ED/review";
import TestComp from "./content/pages/ED/ratepage";
import Calendar from "./content/pages/CD/calendar";
import DiscussionForum from "./content/pages/CD/discussionForum";
import { CreateGroup } from "./content/pages/DeptHead/CreateGroup";
import ViewGroups from "./content/pages/DeptHead/ViewGroups";
import GroupInfo from "./content/pages/DeptHead/GroupInfo";
import Chat from "./content/pages/CD/chat";
import AdminChart from "./content/pages/AICTE/AdminChart";
import EducatorFeedback from "./content/pages/ED/feedback-page";
import ApproveCurriculum from "./content/pages/AICTE/ApproveCurriculum";
import FeedbackChart from "./content/pages/AICTE/FeedbackChart";
import GetSubjectsList from "./content/pages/CD/subjectsList";
import CDDashboard from "./content/pages/CD/dashboard";
import BuildCurriculum from "./content/pages/CD/buildCurriculum";
import EditableBuildCurriculum from "./content/pages/DeptHead/editableBuildCurriculum";
import ViewDraftStatus from "./content/pages/DeptHead/viewDraftStatus";
import HeadCreateDocument from "./content/pages/DeptHead/createDocument";


// Pages
const DynamicRoutes = () => {
  
  const role = localStorage.getItem("shiksha-niyojak-role");
  let all_routes = [
    {
      path: "",
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to = "/login" />,
        },
      ]
    },
    {
      path: "/register",
      element: <Checkout />,
      children: [
        {
          path: "page1",
          element: <Page1New />,
        },
        {
          path: "",
          element: <Navigate to="page2" replace />,
        },
        {
          path: "page2",
          element: <Page2New />,
        },
        {
          path: "",
          element: <Navigate to="page3" replace />,
        },
        {
          path: "page3",
          element: <Page3New />,
        },
      ],
    },
    {
      path: "login",
      element: <CurriculumDeveloperLogin />,
      children: [],
    },
    {
      path: "otpscript",
      element: <OtpScript />,
      children: [],
    },
    {
      path: "register-educator",
      element: <RegisterEducator />,
      children: [],
    },
    {
      path: "aicte",
      element: <AICTELayout />,
      children: [
        {
          path: "addDeptHeads",
          element: <AddDeptHeads />,
        },
        {
          path: "addDepartment",
          element: <AddDepartment />,
        },
        {
          path: "notifyCD",
          element: <NotifyCDS />,
        },
        {
          path: "notifyEducators",
          element: <NotifyEducators />,
        },
        {
          path: "addGuidelines",
          element: <AddGuidelines />,
        },
        {
          path: "approveCDs",
          element: <ApproveCurriculumDevelopers />,
        },
        {
          path: "approveCurriculum",
          element: <ApproveCurriculum />,
        },
        {
          path: "adminChart",
          element: <AdminChart />,
        },
        {
          path: "feedbackChart",
          element: <FeedbackChart />,
        },
      ],
    },

    // {
    //   path : 'curriculumDeveloper',
    //   element : <DeptHeadLayout />,
    //   children : [{
    //     path : 'discussionForum',
    //     element : <DiscussionForum />
    //   },]}
  ];
  if (role == "Educator") {
    all_routes.push({
      path: "ED",
      element: <EducatorLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardED />,
        },
        {
          path: "requirements",
          element: <PostRequirements />,
        },
        {
          path: "viewGuidelines",
          element: <ViewGuidelinesED />,
        },
        {
          path: "review",
          element: <EDviewcurri />,
        },
        {
          path: "rate/:id",
          element: <EducatorFeedback />,
        },
      ],
    });
  }
  // else if (role == "DepartmentHead") {
  //   all_routes.push({
  //     path: "deptHead",
  //     element: <DeptHeadLayout />,
  //     children: [
  //       {
  //         path: "overview",
  //         element: <DashboardDeptHead />,
  //       },
  //       {
  //         path: "createGroup",
  //         element: <CreateGroup />,
  //       },
  //       {
  //         path: "viewGroups",
  //         element: <ViewGroups />,
  //       },
  //       {
  //         path: "viewGroupInfo",
  //         element: <GroupInfo />,
  //       },
  //       {
  //         path: "viewRequirements",
  //         element: <ViewRequirements />,
  //       },
  //       // {
  //       //   path: "ltpModel",
  //       //   element: <EditableBuildCurriculum />,
  //       // },
  //       {
  //         path: "viewGuidelines",
  //         element: <ViewGuidelines />,
  //       },
  //     ],
  //   });
  // }
  else if (role == "CurriculumDeveloper" ) {
    all_routes.push({
      path: "curriculumDeveloper",
      element: <CurriculumDeveloperLayout />,
      children: [
        {
          path: "dashboard",
          element: <CDDashboard />,
        },
        {
          path: "books",
          element: <SubjectsForResources />,
        },
        {
          path: "subjects",
          element: <Courses />,
        },
        {
          path: "document",
          element: <Document />,
        },
        {
          path: "viewGuidelines",
          element: <ViewGuidelines />,
        },
        {
          path: "createDocument",
          element: <CreateDocument />,
        },
        {
          path: "allCurriculums",
          element: <GetSubjectsList />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "chat",
          element: <Chat />,
        },

        {
          path: "viewRequirements",
          element: <ViewRequirements />,
        },
        {
          path: "discussionForum",
          element: <DiscussionForum />,
        },
        {
          path: "ltpModel",
          element: <BuildCurriculum />,
        },
      ],
    });
  }

  all_routes.push({
    path: "deptHead",
    element: <DeptHeadLayout />,
    children: [
      {
        path: "overview",
        element: <DashboardDeptHead />,
      },
      {
        path: "createGroup",
        element: <CreateGroup />,
      },
      {
        path: "viewGroups",
        element: <ViewGroups />,
      },
      {
        path: "viewStatus",
        element: <ViewDraftStatus />,
      },
      {
        path: "viewGroupInfo",
        element: <GroupInfo />,
      },
      {
        path: "viewRequirements",
        element: <ViewRequirements />,
      },
      {
        path: "ltpModel",
        element: <EditableBuildCurriculum />,
      },
      {
        path: "viewGuidelines",
        element: <ViewGuidelines />,
      },
      {
        path : "createDocument",
        element : <HeadCreateDocument />
      }
    ],
  });

  const routes = useRoutes(all_routes);
  return routes;
};
export default DynamicRoutes;
