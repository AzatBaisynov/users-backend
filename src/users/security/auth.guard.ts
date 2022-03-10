import { JWT_SECRET } from '@app/config/config';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context).getContext();
		if (!ctx.headers.authorization) {
			return false;
		}
		ctx.user = await this.validateToken(ctx.headers.authorization);
		return true;
	}

	async validateToken(auth: string): Promise<string> {
		if (auth.split(' ')[0] !== 'Bearer') {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
		const token = auth.split(' ')[1];
		try {
			return await verify(token, JWT_SECRET);
		} catch (err) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
	}
}