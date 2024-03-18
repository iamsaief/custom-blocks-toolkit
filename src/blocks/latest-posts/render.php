<?php

$args = array(
	'posts_per_page'	=> $attributes[ 'numberOfPosts' ],
	'post_status'		=> 'publish',
	'order'				=> $attributes['order'],
	'orderby'			=> $attributes['orderby'],
);
if(isset($attributes['categories'])){
	$args['category__in'] = array_column($attributes['categories'], 'id');
}
$recent_posts = get_posts($args);

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<ul style="--posts-per-column: <?php echo $attributes['postsPerColumn']?>">
		<?php foreach( $recent_posts as $post ):
			$title = get_the_title( $post );
			$title = $title ? $title : __("No title", 'latest-posts');
			$permalink = get_permalink( $post );
			$excerpt = get_the_excerpt( $post );
		?>
			<li>
				<?php if($attributes['displayFeatImg'] && has_post_thumbnail( $post )):?>
					<?php echo get_the_post_thumbnail( $post, 'large' )?>
				<?php endif;?>
				<h5><a href="<?php esc_url( $permalink )?>"><?php echo $title?></a></h5>
				<time datetime="<?php echo esc_attr( get_the_date( 'c', $post ) )?>"><?php echo esc_html( get_the_date( '', $post ) )?></time>
				<?php if(!empty($excerpt)):?>
					<p><?php echo $excerpt; ?></p>
				<?php endif;?>
			</li>
		<?php endforeach;?>
	</ul>
</div>