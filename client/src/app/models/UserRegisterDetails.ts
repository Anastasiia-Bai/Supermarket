export class UserRegisterDetails {
    public constructor(
        public userId?: number,
        public firstName?: string,
        public lastName?: string,
        public password?: string,
        public role?: string,
        public city?: string,
        public street?: string,
        public email?: string,
    ) { }
  }