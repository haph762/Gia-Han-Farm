export * from './auth.service';
import { AuthService } from './auth.service';
export * from './news.service';
import { NewsService } from './news.service';
export * from './productServiceCategory.service';
import { ProductServiceCategoryService } from './productServiceCategory.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthService, NewsService, ProductServiceCategoryService, UsersService];
