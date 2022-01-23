import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  findAll() {
    return this.topicRepository.find();
  }

  async findOne(id: number) {
    const topic = await this.topicRepository.findOne(id);
    if (!topic) {
      throw new NotFoundException(`topic ${id} not found`);
    }
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.preload({
      id,
      ...updateTopicDto,
    });
    if (!topic) {
      throw new NotFoundException(`topic ${id} not found`);
    }
    return this.topicRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.topicRepository.findOne(id);
    if (!topic) {
      throw new NotFoundException(`topic ${id} not found`);
    }
    return this.topicRepository.remove(topic);
  }
}
