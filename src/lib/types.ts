import FORUM_STATUS from "@/constants/FORUM_STATUS";
import PAPER_RESULT from "@/constants/PAPER_RESULT";
import PAPER_STATUS from "@/constants/PAPER_STATUS";
import REVIEW_SCORE from "@/constants/REVIEW_SCORE";
import USERTYPE from "@/constants/USERTYPE";

export interface FilteredUser {
  id: string;
  email: string;
  userType: USERTYPE;
}

export interface User extends FilteredUser {
  profileCompleted?: boolean;
  student?: FilteredStudent;
  lecturer?: FilteredLecturer;
}

export interface AllUser {
  user: User;
  student?: FilteredStudent;
  lecturer?: FilteredLecturer;
  admin?: FilteredAdmin;
}

export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
    student?: FilteredStudent;
    lecturer?: FilteredLecturer;
    admin?: FilteredAdmin;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}

export interface FilteredStudent {
  id: string;
  firstName: string;
  lastName: string;
  img?: string;
  phoneNo: string;
  matricNo: string;
  userId: FilteredUser;
  programCodeId: string;
}

export interface StudentResponse {
  status: string;
  data: {
    student: FilteredStudent;
    user: FilteredUser;
  };
}

export interface FilteredLecturer {
  id: string;
  firstName: string;
  lastName: string;
  img?: string;
  phoneNo: string;
  expertise: string[];
  userId: FilteredUser;
  googleScholarLink: string;
}

export interface LecturerResponse {
  status: string;
  data: {
    lecturer: FilteredLecturer;
    user: FilteredUser;
  };
}

export interface FilteredAdmin {
  id: string;
  userId: FilteredUser;
}

export interface ProgramCode {
  id: string;
  programCode: string;
  programName: string;
}

export interface Paper {
  id: string;
  title: string;
  keywords: string[];
  file: string;
  status: PAPER_STATUS;
  studentId: string;
  lecturerId: string;
  submittedOn: string;
  submittedBy?: FilteredStudent;
}

export interface PaperResponse {
  status: string;
  data: {
    paper: Paper;
  }
}

export interface ReviewReport {
  id: string;
  papers?: Paper;
  paperId: string;
  lecturerId: string;
  titleScore: REVIEW_SCORE;
  objectiveScore: REVIEW_SCORE;
  problemStatementScore: REVIEW_SCORE;
  projectScopeScore: REVIEW_SCORE;
  methodologyScore: REVIEW_SCORE;
  projectPlanScore: REVIEW_SCORE;
  remarks: string;
  overallScore: PAPER_RESULT;
  reviewed: boolean;
}

export interface ReviewReportResponse {
  status: string;
  data: {
    reviewReport: ReviewReport;
  }
}

export interface Forum {
  id: string;
  title: string;
  dateCreated: string;
  userId: string;
  createdBy: User
  status: FORUM_STATUS
}

export interface Message {
  id: string;
  createdOn: string;
  message: string;
  userId: string;
  forumId: string;
  forum: Forum
  sentBy: User
}

export interface ForumResponse {
  status: string;
  data: {
    forum: Forum;
    message: Message
  }
}

export interface MessageResponse {
  status: string;
  data: {
    message: Message
  }
}