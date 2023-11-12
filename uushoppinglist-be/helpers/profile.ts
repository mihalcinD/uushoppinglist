import { Request } from 'express';
import axios from 'axios';
import { User } from '../types/user';
import { Profiles } from '../types/enums/profiles';
export async function getUserInfo(req: Request): Promise<User | undefined> {
	const uri = process.env.ISSUER_BASE_URL + '/userinfo';

	return new Promise<User | undefined>((resolve, reject) => {
		if (req.auth) {
			axios
				.get<User>(uri, {
					headers: {
						Authorization: `Bearer ${req.auth.token}`,
					},
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					resolve(undefined);
				});
		} else {
			resolve(undefined);
		}
	});
}

export const isAuthorized = (userID: string, listID: string, profiles: Array<Profiles>): boolean => {
	const profile = getProfile(userID, listID);
	if (profile)
		profiles.forEach(_profile => {
			if (_profile === profile) return true;
		});
	return false;
};

const getProfile = (userID: string, listID: string): Profiles | undefined => {
	//currently mock data, but will be replaced with database call to get list by listID
	const mockList = { ownerID: 'xx', memberIDs: ['xx', 'yy'] };
	if (userID === mockList.ownerID) return Profiles.OWNER;
	if (mockList.memberIDs.includes(userID)) return Profiles.MEMBER;
	return;
};
