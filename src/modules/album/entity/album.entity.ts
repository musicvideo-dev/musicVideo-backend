import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Track } from 'src/modules/track/entity/track.entity';
import { AlbumStatus } from '../types/album.type';
import { Artist } from 'src/modules/artist/entity/artist.entity';

@Entity()
export class Album {
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

    // @OneToMany(() => Track, (track) => track.artist, { onDelete: 'CASCADE', cascade: true })
    // tracks: Track[]

    @OneToMany(() => Track, (track) => track.album, { onDelete: 'CASCADE' })
    trackAlbums: Track[]

    @ManyToOne(() => Artist, (artist) => artist.album, { onDelete: 'CASCADE' })
    artist: Artist

    @Column()
    artistId:number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: AlbumStatus,
        default: AlbumStatus.PENDING, // You can set a default status if needed
    })
    status: AlbumStatus;
}