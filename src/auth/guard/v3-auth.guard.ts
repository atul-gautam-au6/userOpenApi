import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class V3AuthGuard extends AuthGuard('v3') {}
