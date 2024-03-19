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
			$excerpt = wp_trim_words(get_the_excerpt( $post->ID ), $attributes['excerptLength']);
            $categories = array_column(get_the_category( $post->ID ), 'cat_name');
		?>
			<li>
				<?php if($attributes['displayFeatImg'] && has_post_thumbnail( $post )):?>
					<?php echo get_the_post_thumbnail( $post, 'large' )?>
				<?php endif;?>
				<h4 class="title"><a href="<?php echo esc_url( $permalink )?>"><?php echo $title?></a></h4>
				<p class="category">
					<?php 
						$lastIndex = count($categories) - 1;
						foreach ($categories as $index => $word) {
							echo $word;
							if ($index < $lastIndex) echo ", ";
						}
					?>
				</p>
				<time datetime="<?php echo esc_attr( get_the_date( 'c', $post ) )?>"><?php echo esc_html( get_the_date( '', $post ) )?></time>
				<?php if(!empty($excerpt)): ?>
					<p><?php echo $excerpt; ?></p>
				<?php endif;?>
			</li>
		<?php endforeach;?>
	</ul>
</div>