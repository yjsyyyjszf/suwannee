/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import fabricIntegration from 'fabric-integration';
import { ConfigService } from '../common/config/Config.service';
import { JwtMiddleware } from '../middleware/Jwt.middleware';
import { ApiController } from './Api.controller';
import { ApiService } from './Api.service';
import { FabricService } from './services/fabric/Fabric.service';
@Module({
    controllers: [ApiController],
    providers: [ApiService, fabricIntegration, FabricService, ConfigService]
})
export class ApiModule implements NestModule {
    private config = new ConfigService();
    /**
     * Configure Apimodule to add middleware
     *
     * @param {MiddlewareConsumer} consumer
     * @memberof ApiModule
     */
    public configure(consumer: MiddlewareConsumer): void {
        if (this.config.isApiAuthEnabled()) {
            consumer.apply(JwtMiddleware).forRoutes(ApiController);
        }
    }
}
