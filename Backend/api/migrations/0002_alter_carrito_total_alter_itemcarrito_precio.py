# Generated by Django 4.2.2 on 2023-06-30 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrito',
            name='total',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='itemcarrito',
            name='precio',
            field=models.DecimalField(decimal_places=0, editable=False, max_digits=10),
        ),
    ]