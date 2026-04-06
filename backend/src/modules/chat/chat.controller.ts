import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ChatService } from './chat.service';

class SendMessageDto {
  @IsString() @IsNotEmpty() sessionId: string;
  @IsString() @IsNotEmpty() content: string;
}

class CreateSessionDto {
  modelId: number;
  modelName: string;
}

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('session')
  @ApiOperation({ summary: 'Create a new chat session' })
  createSession(@Body() dto: CreateSessionDto) {
    return this.chatService.createSession(dto.modelId ?? 1, dto.modelName ?? 'GPT-5');
  }

  @Get('session/:id')
  @ApiOperation({ summary: 'Get a chat session by ID' })
  getSession(@Param('id') id: string) {
    return this.chatService.getSession(id) ?? { error: 'Session not found' };
  }

  @Post('message')
  @ApiOperation({ summary: 'Send a message and get AI reply' })
  sendMessage(@Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(dto.sessionId, dto.content);
  }

  @Get('quick-actions')
  @ApiOperation({ summary: 'Get quick action items for the sidebar' })
  getQuickActions() { return this.chatService.getQuickActions(); }

  @Get('welcome-cards')
  @ApiOperation({ summary: 'Get welcome card options' })
  getWelcomeCards() { return this.chatService.getWelcomeCards(); }

  @Get('suggestion-chips')
  @ApiOperation({ summary: 'Get suggestion filter chips' })
  getSuggestionChips() { return this.chatService.getSuggestionChips(); }

  @Get('prompt-suggestions')
  @ApiOperation({ summary: 'Get prompt suggestions, optionally filtered by category' })
  @ApiQuery({ name: 'category', required: false })
  getPromptSuggestions(@Query('category') category?: string) {
    return this.chatService.getPromptSuggestions(category);
  }
}
