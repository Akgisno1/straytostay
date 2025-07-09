// ============================================================================
// CORE USER INTERFACES
// ============================================================================

export interface User {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  avatar?: string[];
  bio?: string;
  role?: "user" | "ngo";
  phoneNumber?: string;
  city?: string;
  state?: string;
  isActive?: boolean;
  notifications?: number;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  instagram?: string;
  foundedDate?: Date;
}

// ============================================================================
// ADOPTION & POST INTERFACES
// ============================================================================

export interface Post {
  _id: string;
  authorUsername: string;
  authorId: string;
  authorType: "user" | "ngo";
  title: string;
  description: string;
  images: string[];
  urgency: boolean;
  status: "active" | "adopted" | "expired" | "removed";
  animalDetails?: AnimalDetails;
  requests: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface AnimalDetails {
  type: "dog" | "cat" | "bird" | "rabbit" | "other";
  age: number;
  ageUnit: "days" | "weeks" | "months" | "years";
  gender: "male" | "female" | "unknown";
  color: string;
  isNeutered: boolean;
  isVaccinated: boolean;
}

// ============================================================================
// NGO ACTIVITY INTERFACES
// ============================================================================

export interface Activity {
  _id: string;
  title: string;
  images: string[];
  likes: string[];
  authorId: string;
  authorType: "ngo";
  comments: string[];
  createdAt: Date;
  updatedAt?: Date;
}

// ============================================================================
// COMMENT INTERFACES
// ============================================================================

export interface Comment {
  _id: string;
  content: string;
  authorId: string;
  authorType: "user" | "ngo";
  parentId: string;
  replies: string[];
  createdAt: Date;
  updatedAt?: Date;
}

// ============================================================================
// CHAT & MESSAGING INTERFACES
// ============================================================================

export interface Chat {
  _id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: { [userId: string]: number };
  createdAt: Date;
  updatedAt?: Date;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  content: string;
  messageType: "text" | "image" | "file";
  attachments?: Attachment[];
  isRead: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Attachment {
  type: "image" | "file";
  url?: string;
  filename?: string;
  size?: number;
  mimeType?: string;
}

// ============================================================================
// NOTIFICATION INTERFACES
// ============================================================================

export interface Notification {
  _id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: NotificationData;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  readAt?: Date;
}

export type NotificationType =
  | "post_like"
  | "post_comment"
  | "post_share"
  | "activity_like"
  | "activity_comment"
  | "question_answer"
  | "answer_upvote"
  | "comment_like"
  | "new_message"
  | "adoption_request"
  | "adoption_approved"
  | "adoption_rejected"
  | "event_reminder"
  | "system_announcement";

export interface NotificationData {
  postId?: string;
  activityId?: string;
  questionId?: string;
  answerId?: string;
  commentId?: string;
  chatId?: string;
  messageId?: string;
  senderId?: string;
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// ADOPTION REQUEST INTERFACES
// ============================================================================

export interface AdoptionRequest {
  _id: string;
  postId: string;
  requesterId: string;
  requesterType: "user" | "ngo";
  ownerId: string;
  ownerType: "user" | "ngo";
  status: "pending" | "approved" | "rejected" | "cancelled";
  message?: string;
  requestedDate: Date;
  responseDate?: Date;
  responseMessage?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// ============================================================================
// BOOKMARK & FAVORITE INTERFACES
// ============================================================================

export interface Bookmark {
  _id: string;
  userId: string;
  userType: "user" | "ngo";
  itemId: string;
  itemType: "post" | "activity" | "question";
  createdAt: Date;
}

// ============================================================================
// SEARCH & FILTER INTERFACES
// ============================================================================

export interface SearchFilters {
  query?: string;
  type?: "post" | "activity" | "question" | "user" | "ngo";
  category?: string;
  tags?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
    radius?: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  animalType?: string[];
  urgency?: boolean;
  status?: string[];
  authorType?: "user" | "ngo";
  sortBy?: "relevance" | "date" | "popularity" | "distance";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================================================
// API RESPONSE INTERFACES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: ValidationError[];
  pagination?: PaginationInfo;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================================================
// AUTHENTICATION INTERFACES
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  userType: "user" | "ngo";
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "user" | "ngo";
  phoneNumber?: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
  userType: "user" | "ngo";
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================================================
// FILE UPLOAD INTERFACES
// ============================================================================

export interface FileUploadResponse {
  url: string;
  publicId: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
}

export interface ImageUploadOptions {
  folder?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
  };
}

// ============================================================================
// STATISTICS & ANALYTICS INTERFACES
// ============================================================================

export interface UserStats {
  totalPosts: number;
  totalQuestions: number;
  totalAnswers: number;
  totalLikes: number;
  totalViews: number;
  adoptionSuccessRate: number;
  responseRate: number;
  averageResponseTime: number;
}

export interface NGOStats {
  totalActivities: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalViews: number;
  eventSuccessRate: number;
  averageAttendance: number;
  responseRate: number;
}

export interface PlatformStats {
  totalUsers: number;
  totalNGOs: number;
  totalPosts: number;
  totalAdoptions: number;
  totalActivities: number;
  totalQuestions: number;
  totalAnswers: number;
  activeUsers: number;
  monthlyGrowth: number;
}

// ============================================================================
// REPORT & MODERATION INTERFACES
// ============================================================================

export interface Report {
  _id: string;
  reporterId: string;
  reporterType: "user" | "ngo";
  reportedItemId: string;
  reportedItemType:
    | "post"
    | "activity"
    | "question"
    | "answer"
    | "comment"
    | "user"
    | "ngo";
  reason: ReportReason;
  description?: string;
  evidence?: string[];
  status: "pending" | "investigating" | "resolved" | "dismissed";
  moderatorId?: string;
  moderatorNotes?: string;
  actionTaken?: ModerationAction;
  createdAt: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
}

export type ReportReason =
  | "spam"
  | "inappropriate_content"
  | "harassment"
  | "fake_information"
  | "animal_abuse"
  | "illegal_activity"
  | "other";

export interface ModerationAction {
  type: "warning" | "content_removal" | "temporary_ban" | "permanent_ban";
  duration?: number; // in days
  reason: string;
  affectedItems: string[];
}

// All interfaces are already exported above
