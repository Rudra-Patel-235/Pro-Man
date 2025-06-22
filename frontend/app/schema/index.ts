export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: Date;
    isVerified: boolean;
    updatedAt: Date;
    profilePic?: string; 
}

export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: User | string;
    color: string;
    members: {
        user: User;
        role: 'admin' | 'member' | 'viewer' | 'owner';
        joinedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
