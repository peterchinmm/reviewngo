import { ReviewReport } from "@prisma/client";
import {
  AllUser,
  FilteredLecturer,
  FilteredStudent,
  FilteredUser,
  Forum,
  ForumResponse,
  LecturerResponse,
  Message,
  MessageResponse,
  Paper,
  PaperResponse,
  ReviewReportResponse,
  StudentResponse,
  User,
  UserLoginResponse,
  UserResponse,
} from "./types";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(JSON.stringify(data.errors));
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

export async function apiRegisterUser(
  credentials: string
): Promise<FilteredUser> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiLoginUser(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutUser(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthUser(token?: string): Promise<User> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers,
    cache: "no-store",
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiGetAuthUserDetails(token?: string): Promise<AllUser> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers,
    cache: "no-store",
  });

  return handleResponse<UserResponse>(response).then((data) => data.data);
}

export async function apiRegisterStudent(credentials: string): Promise<User> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/students`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<StudentResponse>(response).then(
    (data) => data.data.user
  );
}

export async function apiUpdateStudent(
  credentials: string,
  studentId: string
): Promise<FilteredStudent> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/students/${studentId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<StudentResponse>(response).then(
    (data) => data.data.student
  );
}

export async function apiRegisterLecturer(credentials: string): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/lecturers`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<LecturerResponse>(response).then(
    (data) => data.data
  );
}

export async function apiUpdateLecturer(
  credentials: string,
  lecturerId: string
): Promise<FilteredLecturer> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/lecturers/${lecturerId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentials,
    }
  );

  return handleResponse<LecturerResponse>(response).then(
    (data) => data.data.lecturer
  );
}

export async function apiUpdateStudentImage(
  credentials: string,
  studentId: string
): Promise<FilteredStudent> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/students/image/${studentId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentials,
    }
  );

  return handleResponse<StudentResponse>(response).then(
    (data) => data.data.student
  );
}

export async function apiUpdateLecturerImage(
  credentials: string,
  lecturerId: string
): Promise<FilteredLecturer> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/lecturers/image/${lecturerId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentials,
    }
  );

  return handleResponse<LecturerResponse>(response).then(
    (data) => data.data.lecturer
  );
}

export async function apiCreatePaper(credentials: string,): Promise<Paper> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/paper`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,

  });

  return handleResponse<PaperResponse>(response).then(
    (data) => data.data.paper
  );
}

// export async function apiFindStudentPaper(studentId: string): Promise<Paper[]> {
//   const response = await fetch(`${SERVER_ENDPOINT}/api/paper?studentId=${studentId}`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store"

//   });

//   return handleResponse<PaperResponse>(response).then(
//     (data) => data.data.paper
//   );
// }

export async function apiReviewReport(
  credentials: string,
  reviewReportId: string
): Promise<ReviewReport> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/reviewReport/${reviewReportId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentials,
    }
  );

  return handleResponse<ReviewReportResponse>(response).then(
    (data) => data.data.reviewReport
  );
}

export async function apiCreateForum(
  credentials: string
): Promise<Forum> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/forum`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials
  })

  return handleResponse<ForumResponse>(response).then((data) => data.data.forum)
}

export async function apiCreateMessage(
  credentials: string
): Promise<Message> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials
  })

  return handleResponse<MessageResponse>(response).then((data) => data.data.message)
}