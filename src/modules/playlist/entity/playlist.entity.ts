import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Track } from 'src/modules/track/entity/track.entity';
import { PlayListStatus } from '../types/playlist.type';

@Entity()
export class PlayList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, unique: true })
    name?: string;

    @Column({ nullable: true })
    imgUrl: string

    @Column({ nullable: true })
    coverUrl: string

    @Column({ unique: true })
    slug: string

    @OneToMany(() => Track, (track) => track.artist, { onDelete: 'CASCADE', cascade: true })
    tracks: Track[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: PlayListStatus,
        default: PlayListStatus.PENDING, // You can set a default status if needed
    })
    status: PlayListStatus;
}